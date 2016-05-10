# [How to Prepare the Surfaces of Common Materials](http://ifreecarve.github.io/surface-prep/)

You have a material (like wood, steel, plastic, etc), with something on it (rust, paint, grease, stickers, ants, etc).  You want it to have something different on it (paint, chrome, wax, grease, spiders, etc).  What do you apply to your material, and in what order?

As of May 2016, the Internet was not very helpful on this topic -- either it worked backwards (e.g. "103949 uses for vinegar!"), or was very loose on the differences between mineral spirits and paint thinner, types of alchol, etc.

So I made some diagrams to help me.

![Example diagram showing a graph with three nodes and four edges](http://ifreecarve.github.io/surface-prep/img/plastic-demo.png "Horribly incomplete diagram for plastic")


## How to Read These

All the diagrams assume some base material (steel, wood, plastic, etc).  The dots in the diagram are substances that might be found on this surface (like water, oil, etc).  Each of the arrows lists a chemical or process that can be applied to the material, and shows what you will end up when if you apply that chemical.

```
 ___      water      _____      time      ____________
|soap| -----------> |water| -----------> |bare plastic|
 ----                -----                ------------
```

In the above example, consider a plastic surface that has soap on it.  You apply water; now you have a surface that has water on it.  You apply time; now you have a bare plastic surface.  In practice, many arrows can start or end at a particular surface covering.


## Design Goals

I favor a practical guide above perfect consistency or pedantic naming.  The chemical names correspond to what one would expect to buy at the store, and (where appropriate) aim for hints that would reduce the density of the diagram.  For example, as of this writing, "acetone" refers to the somewhat-impure chemical that comes from a hardware store.  It leaves a residue.  Industrial-grade acetone (discussed online as "reagent" acetone) fully evaporates.  Rather than make two sets of arrows, I noted that reagent acetone can clean up regular acetone and I leave it to the reader to put the pieces together.

Whether chemicals should be made more general or more specific, or whether the list of surfaces should be made more general or more specific, the end goal here is a practical, understandable guide.  Any and all contributions toward that goal will be graciously accepted.


## How to Contribute

I'm a novice at [d3](https://d3js.org/).
I don't have a very good knowledge of the best practices for which chemicals to apply (and when) in woodworking, metalworking, nor for any of the wide range of plastics.
I am happy for all the help I can get.  Here's how:

* Send me an email with material/chemical suggestions at ifreecarve@gmail.com, (and be prepared to cite sources).
* Fork this repository and add lines to the relevant CSV files.  It's the `gh-pages` branch.
* Mention this page to a friend who does a lot of work in their garage or shop.
