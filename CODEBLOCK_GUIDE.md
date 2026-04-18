# CodeBlock Component - Usage Guide

## 🎨 Features

Your new elegant code block component includes:

- ✅ **Syntax Highlighting** - VS Code Dark+ theme with support for 15+ languages
- ✅ **Copy to Clipboard** - One-click copy with confirmation feedback
- ✅ **Line Numbers** - Optional line numbering for better code reference
- ✅ **macOS-Style Header** - Beautiful traffic light decoration
- ✅ **Language Badge** - Automatic language detection and display
- ✅ **File Name Support** - Optional filename display in header
- ✅ **Responsive Design** - Works perfectly on all screen sizes
- ✅ **Dark Theme** - Professional VS Code appearance

## 📦 Installation

Already installed! The following packages were added:
\`\`\`bash
npm install react-syntax-highlighter @types/react-syntax-highlighter
\`\`\`

## 🚀 Basic Usage

### Standalone CodeBlock Component

\`\`\`jsx
import CodeBlock from './components/CodeBlock';

function MyComponent() {
return (
<CodeBlock
code={\`const greeting = "Hello, World!";
console.log(greeting);\`}
language="javascript"
showLineNumbers={true}
/>
);
}
\`\`\`

### With Filename

\`\`\`jsx
<CodeBlock
code={\`export default function App() {
return <h1>Hello!</h1>;
}\`}
language="jsx"
fileName="App.jsx"
showLineNumbers={true}
/>
\`\`\`

### Without Line Numbers

\`\`\`jsx
<CodeBlock
code={\`npm install package-name
npm run build\`}
language="bash"
showLineNumbers={false}
/>
\`\`\`

## 📝 MarkdownRenderer Component

The **MarkdownRenderer** automatically converts markdown text (including code blocks) into beautiful HTML with syntax highlighting.

### Usage in Blog Posts

\`\`\`jsx
import MarkdownRenderer from './components/MarkdownRenderer';

function BlogPost({ content }) {
return (
<article>
<MarkdownRenderer content={content} />
</article>
);
}
\`\`\`

### Markdown Syntax Support

The renderer supports:

- **Headings**: \`# H1\`, \`## H2\`, etc.
- **Code blocks**: Triple backticks with language specification
- **Inline code**: \`code here\`
- **Bold text**: \`**bold**\`
- **Lists**: \`- item\` or \`\* item\`
- **Checkboxes**: \`- ✅ Done\` or \`- ❌ Not done\`

### Example Markdown Content

\`\`\`markdown

# My Article

This is a paragraph with **bold text** and \`inline code\`.

## Code Example

\`\`\`javascript
function hello() {
console.log("Hello, World!");
}
\`\`\`

## Features

- ✅ Syntax highlighting
- ✅ Copy button
- ✅ Line numbers
  \`\`\`

## 🎯 Props Reference

### CodeBlock Props

| Prop                | Type      | Default          | Description                 |
| ------------------- | --------- | ---------------- | --------------------------- | --------------------------- |
| \`code\`            | string    | **required**     | The code content to display |
| \`language\`        | string    | \`'javascript'\` | Programming language        |
| \`showLineNumbers\` | boolean   | \`true\`         | Show/hide line numbers      |
| \`fileName\`        | string \\ | null             | \`null\`                    | Optional filename in header |

### MarkdownRenderer Props

| Prop        | Type   | Default      | Description                |
| ----------- | ------ | ------------ | -------------------------- |
| \`content\` | string | **required** | Markdown content to render |

## 🌈 Supported Languages

- JavaScript / TypeScript
- JSX / TSX
- Bash / Shell
- JSON
- CSS / HTML
- SQL
- Python
- Java
- Prisma
- YAML
- Markdown
- And many more...

## 💡 Real-World Examples

### 1. Blog Post with Code

\`\`\`jsx
import MarkdownRenderer from './components/MarkdownRenderer';

const blogContent = \`

# Building a REST API

Here's how to create an endpoint:

\\\`\\\`\\\`typescript
@Post('users')
async createUser(@Body() dto: CreateUserDto) {
return this.usersService.create(dto);
}
\\\`\\\`\\\`

This creates a POST endpoint at \\\`/users\\\`.
\`;

function BlogPost() {
return (
<article className="max-w-4xl mx-auto p-8">
<MarkdownRenderer content={blogContent} />
</article>
);
}
\`\`\`

### 2. Documentation Page

\`\`\`jsx
import CodeBlock from './components/CodeBlock';

function APIDocumentation() {
return (
<div>
<h2>Authentication Example</h2>
<CodeBlock
code={\`curl -X POST http://api.example.com/auth/login \\\\
-H "Content-Type: application/json" \\\\
-d '{"email":"user@example.com","password":"secret"}'\`}
language="bash"
showLineNumbers={false}
/>
</div>
);
}
\`\`\`

### 3. Code Tutorial

\`\`\`jsx
import CodeBlock from './components/CodeBlock';

function Tutorial() {
return (
<div>
<h3>Step 1: Create the service</h3>
<CodeBlock
        language="typescript"
        fileName="user.service.ts"
        code={userServiceCode}
      />

      <h3>Step 2: Inject into controller</h3>
      <CodeBlock
        language="typescript"
        fileName="user.controller.ts"
        code={userControllerCode}
      />
    </div>

);
}
\`\`\`

## 🎨 Customization

### Changing the Theme

Edit \`CodeBlock.jsx\` and import a different theme:

\`\`\`javascript
// Available themes
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
\`\`\`

### Adjusting Colors

Customize the component's colors in \`CodeBlock.jsx\`:

\`\`\`javascript
// Header background
className="bg-[#2d2d2d]"

// Code background
customStyle={{ background: '#1e1e1e' }}

// Border color
className="border-gray-700/50"
\`\`\`

## 🌍 Where It's Used

Your CodeBlock is already integrated into:

1. **Blog Posts** - All 10 blog posts automatically render code blocks beautifully
2. **BlogDetails Page** - Uses MarkdownRenderer to display full articles
3. Ready for use in any component!

## 📍 View Your Blogs

Visit your blog to see the CodeBlock in action:

- **Local**: http://localhost:5174/blog
- Click any blog post to see syntax highlighting live!

## 🎉 Success!

Your portfolio now has:

- ✨ Professional syntax highlighting
- 📋 Copy-to-clipboard functionality
- 🎨 Beautiful VS Code-style theme
- 📱 Responsive design
- 🚀 Ready for production

Happy coding! 🚀
