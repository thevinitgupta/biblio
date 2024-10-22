import { Editor } from '@tiptap/react'
import React from 'react'

export const CharacterCount = ({ editor, limit = 2000 }: {
    editor: Editor | null,
    limit ? : number
}) => {
    if(!editor) return null;
    const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0;

  return (

      <div className={`character-count ${editor.storage.characterCount.characters() === limit ? 'character-count--warning' : ''}`}>
        <svg
          height="16"
          width="16"
          viewBox="0 0 20 20"
        >
          <circle
            r="10"
            cx="10"
            cy="10"
            fill="#e9ecef"
          />
          <circle
            r="5"
            cx="10"
            cy="10"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
            transform="rotate(-90) translate(-20)"
          />
          <circle
            r="6"
            cx="10"
            cy="10"
            fill="white"
          />
        </svg>

        {editor.storage.characterCount.characters()} / {limit} characters
      </div>
  );
}

