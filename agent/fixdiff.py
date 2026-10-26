"""Which test-case steps / expected results a manual fix changed.
A block (// Step N, // Expected N, // Preconditions) counts as fixed when its own lines changed, or, for a shared locator
whose declaration was fixed outside the steps, the first step or expected-result block that uses it."""
import re,difflib
MK=re.compile(r"^\s*//\s*(Preconditions|Step (\d+)|Expected (\d+))\b")
DECL=re.compile(r"^\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=|^\s*(?:async\s+)?function\s+([A-Za-z_$][\w$]*)")
def blocks(lines):
    cur="Header"; out=[]
    for l in lines:
        m=MK.match(l)
        if m: cur=m.group(1)
        out.append(cur)
    return out
def changed(orig,fixed):
    a=orig.split("\n"); b=fixed.split("\n"); bb=blocks(b); ab=blocks(a)
    sm=difflib.SequenceMatcher(None,a,b,autojunk=False)
    ch=set(); decls=set(); chlines=[]
    for tag,i1,i2,j1,j2 in sm.get_opcodes():
        if tag=="equal": continue
        for j in range(j1,j2):
            ch.add(bb[j]); chlines.append(b[j])
        for i in range(i1,i2):
            ch.add(ab[i]); chlines.append(a[i])
    # declarations changed → propagate to blocks using the name
    for l in chlines:
        m=DECL.match(l)
        if m: decls.add(m.group(1) or m.group(2))
    # a declaration fixed outside the step blocks (shared locator) is attributed to the first
    # step or expected-result block that uses it, i.e. where the test failed because of it
    for n in decls:
        declared_in_step=any((DECL.match(l) and (DECL.match(l).group(1) or DECL.match(l).group(2))==n
                              and (bb[j].startswith("Step ") or bb[j].startswith("Expected ")))
                             for j,l in enumerate(b))
        if declared_in_step: continue
        for j,l in enumerate(b):
            if DECL.match(l) and (DECL.match(l).group(1) or DECL.match(l).group(2))==n: continue
            if (bb[j].startswith("Step ") or bb[j].startswith("Expected ")) and re.search(r"(?<![\w$.])"+re.escape(n)+r"(?![\w$])",l):
                ch.add(bb[j]); break
    steps=sorted({int(x.split()[1]) for x in ch if x.startswith("Step ")})
    exps=sorted({int(x.split()[1]) for x in ch if x.startswith("Expected ")})
    other=sorted(x for x in ch if not (x.startswith("Step ") or x.startswith("Expected ")))
    return steps,exps,other
