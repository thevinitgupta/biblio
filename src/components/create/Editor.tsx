
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar';
import BubbleMenu from './BubbleMenu';
import SearchBook from './SearchBook'

const limit = 2000;
const defaultContent = `<h3>
Devs Just Want to Have Fun by Cyndi Lauper
</h3>
<p>
I come home in the morning light<br>
My mother says, <mark>“When you gonna live your life right?”</mark><br>
Oh mother dear we’re not the fortunate ones<br>
And devs, they wanna have fun<br>
Oh devs just want to have fun</p>
<p >
The phone rings in the middle of the night<br>
My father yells, "What you gonna do with your life?"<br>
Oh daddy dear, you know you’re still number one<br>
But <s>girls</s>devs, they wanna have fun<br>
Oh devs just want to have
</p>
<p>
That’s all they really want<br>
Some fun<br>
When the working day is done<br>
Oh devs, they wanna have fun<br>
Oh devs just wanna have fun<br>
(devs, they wanna, wanna have fun, devs wanna have)
</p>`;

const Editor = ({setContent, initialValue, onChange, setDisplayText} : {
  setContent : React.Dispatch<React.SetStateAction<string>>,
  initialValue : string,
  onChange : React.Dispatch<React.SetStateAction<string>>,
  setDisplayText : React.Dispatch<React.SetStateAction<string>>,
}) => {
  const editor = useEditor({
    onUpdate({ editor }) {
      // The content has changed.
      const htmlData = `${editor?.getHTML() || ''}`;
      let plainText = editor.getText();
      plainText = plainText.substring(0,Math.max(50, plainText.length));
      setContent(htmlData)
      setDisplayText(plainText);
      onChange(htmlData);
      // console.log("ON UPDATE : ",htmlData)
    },
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Heading,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
      }),
      CharacterCount.configure({
        limit,
      }),
      Placeholder.configure({
        // Use a placeholder:
        emptyEditorClass: 'is-editor-empty',
        placeholder: `What's on your mind?`,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl block resize-none px-8 py-6 w-full max-w-full min-h-[65vh] m-0 bg-base-200 outline-none border-none active:outline-none focus:outline-none focus:border-none placeholder:text-primary/70',
      }
    },
    content : initialValue
  });

  

  return (
    <div className={`join-item w-full`}>
      <MenuBar editor={editor} />
      <BubbleMenu editor={editor} />
      <EditorContent  editor={editor} />
      <dialog id="search_book_modal" className="modal">
                <SearchBook />
            </dialog>
    </div>
  )
}

export default Editor;