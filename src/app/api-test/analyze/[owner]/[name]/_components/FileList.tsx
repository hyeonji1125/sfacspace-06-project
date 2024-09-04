import { RepositoryContent } from '@/types';

export default function FileList({ contents }: { contents: RepositoryContent[] }) {
  return (
    <ul>
      {contents.map((content) => (
        <li key={content.sha}>
          {content.type === 'file' ? '📄' : '📁'} {content.name}
        </li>
      ))}
    </ul>
  );
}
