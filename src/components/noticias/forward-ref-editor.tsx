'use client'
// ForwardRefEditor.tsx

// This is the only place InitializedMDXEditor is imported directly.
import {forwardRef} from "react";
import {MDXEditorMethods, MDXEditorProps} from "@mdxeditor/editor";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import('./Initialize-mdx-editor'), {
    // Make sure we turn SSR off
    ssr: false
})

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => <Editor {...props} editorRef={ref} />)

// TS complains without the following line
ForwardRefEditor.displayName = 'ForwardRefEditor'