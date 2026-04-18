import CodeBlock from '../components/CodeBlock';

/**
 * CodeBlock Component Usage Examples
 *
 * This component provides beautiful syntax highlighting for code blocks
 * with the following features:
 * - Multiple language support
 * - Copy to clipboard
 * - Line numbers
 * - VS Code Dark+ theme
 * - macOS-style window decoration
 */

const CodeBlockExamples = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">
        CodeBlock Component Examples
      </h1>

      {/* Example 1: JavaScript */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">
          1. JavaScript Example
        </h2>
        <CodeBlock
          language="javascript"
          code={`async function fetchUser(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}`}
        />
      </section>

      {/* Example 2: TypeScript with filename */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">
          2. TypeScript with Filename
        </h2>
        <CodeBlock
          language="typescript"
          fileName="auth.service.ts"
          code={`import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(userId: string): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.signAsync(payload);
  }
}`}
        />
      </section>

      {/* Example 3: Bash commands */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">
          3. Bash Commands
        </h2>
        <CodeBlock
          language="bash"
          showLineNumbers={false}
          code={`npm install react-syntax-highlighter
npm run dev
curl -X POST http://localhost:3000/api/login`}
        />
      </section>

      {/* Example 4: JSON */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">
          4. JSON Configuration
        </h2>
        <CodeBlock
          language="json"
          fileName="package.json"
          code={`{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`}
        />
      </section>

      {/* Example 5: SQL */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">5. SQL Query</h2>
        <CodeBlock
          language="sql"
          code={`SELECT 
  u.id,
  u.name,
  u.email,
  COUNT(p.id) as project_count
FROM users u
LEFT JOIN projects p ON p.user_id = u.id
WHERE u.is_active = true
GROUP BY u.id, u.name, u.email
ORDER BY project_count DESC
LIMIT 10;`}
        />
      </section>

      {/* Props Documentation */}
      <section className="mt-16 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Component Props
        </h2>
        <table className="w-full text-left text-gray-300">
          <thead className="text-white border-b border-gray-700">
            <tr>
              <th className="pb-3 pr-4">Prop</th>
              <th className="pb-3 pr-4">Type</th>
              <th className="pb-3 pr-4">Default</th>
              <th className="pb-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            <tr>
              <td className="py-3 pr-4 font-mono text-sm text-blue-400">
                code
              </td>
              <td className="py-3 pr-4">string</td>
              <td className="py-3 pr-4">required</td>
              <td className="py-3">The code content to display</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-mono text-sm text-blue-400">
                language
              </td>
              <td className="py-3 pr-4">string</td>
              <td className="py-3 pr-4">'javascript'</td>
              <td className="py-3">
                Programming language for syntax highlighting
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-mono text-sm text-blue-400">
                showLineNumbers
              </td>
              <td className="py-3 pr-4">boolean</td>
              <td className="py-3 pr-4">true</td>
              <td className="py-3">Show or hide line numbers</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-mono text-sm text-blue-400">
                fileName
              </td>
              <td className="py-3 pr-4">string | null</td>
              <td className="py-3 pr-4">null</td>
              <td className="py-3">Optional filename to display in header</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Supported Languages */}
      <section className="mt-8 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Supported Languages
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-gray-300">
          {[
            'JavaScript',
            'TypeScript',
            'JSX',
            'TSX',
            'Bash',
            'JSON',
            'CSS',
            'HTML',
            'SQL',
            'Python',
            'Java',
            'Prisma',
            'YAML',
            'Markdown',
            'GraphQL',
            'Docker',
          ].map((lang) => (
            <div
              key={lang}
              className="px-3 py-2 bg-gray-700/50 rounded text-sm"
            >
              {lang}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CodeBlockExamples;
