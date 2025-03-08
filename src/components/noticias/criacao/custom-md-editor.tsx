'use client';

import React, { useEffect, useRef } from "react";
import {
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    codeBlockPlugin,
    codeMirrorPlugin,
    CodeToggle,
    CreateLink,
    diffSourcePlugin,
    directivesPlugin,
    frontmatterPlugin,
    headingsPlugin,
    imagePlugin, InsertAdmonition,
    InsertCodeBlock, InsertFrontmatter,
    InsertImage,
    InsertTable,
    InsertThematicBreak,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    Separator,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    UndoRedo
} from "@mdxeditor/editor";
import dynamic from "next/dynamic";

interface CustomMdEditorProps {
    content: string;
    handleChange: (newContent: string) => void;
}

const MDXEditor = dynamic(
    () => import('@mdxeditor/editor').then((mod) => mod.MDXEditor),
    {
        ssr: false,
        loading: () => <p>Carregando Editor....</p>
    }
);

const CustomMdEditor: React.FC<CustomMdEditorProps> = ({handleChange, content}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, []);

    return (
        <div ref={containerRef} className={'w-full h-full dark:invert'}>
            <MDXEditor
                className={'w-full prose prose-full'}
                markdown={content}
                onChange={handleChange}
                placeholder={content}
                plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    diffSourcePlugin(), quotePlugin(),
                    thematicBreakPlugin(),
                    tablePlugin(),
                    frontmatterPlugin(),
                    markdownShortcutPlugin(),
                    linkPlugin(), linkDialogPlugin(),
                    codeBlockPlugin({defaultCodeBlockLanguage: 'txt'}),
                    codeMirrorPlugin({
                        codeBlockLanguages: {
                            js: 'JavaScript',
                            css: 'CSS',
                            txt: 'text',
                            python: 'Python'
                        }
                    }),
                    directivesPlugin(),
                    imagePlugin(),
                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                <UndoRedo/>
                                <Separator/>
                                <BoldItalicUnderlineToggles/>
                                <CodeToggle/>
                                <Separator/>
                                <BlockTypeSelect/>
                                <CreateLink/>
                                <InsertImage/>
                                <Separator/>
                                <InsertTable/>
                                <InsertThematicBreak/>
                                <Separator/>
                                <InsertCodeBlock/>
                                <InsertFrontmatter/>
                                <Separator/>
                                <InsertAdmonition/>
                            </>
                        )
                    })
                ]}
            />
        </div>
    )
}

export default CustomMdEditor;