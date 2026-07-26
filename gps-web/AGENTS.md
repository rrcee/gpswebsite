<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# TypeScript Guidelines for Framer Motion & Three.js

### Framer Motion TypeScript Guidelines
- **Spring Transition Literals**: Always declare spring/tween transitions `as const` inside Framer Motion variants (e.g., `type: "spring" as const`). This forces the compiler to infer the string literal instead of a general `string`, satisfying the `AnimationGeneratorType` constraint.
- **Custom Motion Component Props**: When building wrappers around `<motion.div>` (or other tags) and spreading `{...props}` down, ensure the interface extends `Omit<HTMLMotionProps<"div">, "style">` (imported from `'framer-motion'`) instead of `React.HTMLAttributes<HTMLDivElement>`. This avoids property conflicts on Framer Motion's customized attributes (such as `onDrag`, `onDragStart`, etc.).

### Three.js Configuration
- **Type Declaration Installation**: When installing the `three` package, always install `@types/three` as a devDependency in parallel. This prevents module resolution failures in TypeScript.
