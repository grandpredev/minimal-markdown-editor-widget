const CodeMirror = require('codemirror');
require('codemirror/mode/markdown/markdown');
const marked = require('marked');
const hljs = require('highlight.js');

window.onload = function() {
  const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'markdown',
    lineNumbers: true,
    theme: 'default',
  });

  // Add toolbar buttons for formatting
  const toolbar = document.createElement('div');
  toolbar.innerHTML = `
    <button id="bold-btn"><b>B</b></button>
    <button id="italic-btn"><i>I</i></button>
    <button id="underline-btn"><u>U</u></button>
  `;
  editor.getWrapperElement().parentNode.insertBefore(toolbar, editor.getWrapperElement().nextSibling);

  // Event listeners for toolbar buttons
  document.getElementById('bold-btn').addEventListener('click', () => {
    formatText('**', '**');
  });
  document.getElementById('italic-btn').addEventListener('click', () => {
    formatText('*', '*');
  });
  document.getElementById('underline-btn').addEventListener('click', () => {
    formatText('__', '__');
  });

  editor.on('change', function() {
    updatePreview();
  });

  // Update preview when toolbar buttons are clicked
  function formatText(startTag, endTag) {
    const doc = editor.getDoc();
    const selection = doc.getSelection();
    const newText = startTag + selection + endTag;
    doc.replaceSelection(newText);
    editor.focus();
    updatePreview();
  }

  // Update the preview
  function updatePreview() {
    const content = editor.getValue();
    document.getElementById('preview').innerHTML = marked(content, {
      highlight: function(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
    });
  }

  // Add save and load functionality
  document.getElementById('save-btn').addEventListener('click', () => {
    const content = editor.getValue();
    // Implement save functionality here
    console.log('Markdown content saved:', content);
  });

  document.getElementById('load-btn').addEventListener('click', () => {
    // Implement load functionality here
    const loadedContent = ""; // Load markdown content here
    editor.setValue(loadedContent);
    updatePreview();
  });
};
