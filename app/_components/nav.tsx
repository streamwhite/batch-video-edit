export default function Nav({ className }: { className: string }) {
  return (
    <nav className={className}>
      <ul>
        <li>
          <a href='/'>clip videos-test</a>
        </li>
        <li>
          <a href='/convert'>Convert</a>
        </li>
        <li>
          <a href='/compress'>Compress</a>
        </li>
        <li>
          <a href='/screenshots'>Screenshots</a>
        </li>
        <li>
          <a href='/merge-cta'>Merge CTA</a>
        </li>
        <li>
          <a href='/rename-iphone-videos-with-meta'>Rename Iphone Videos</a>
        </li>
      </ul>
    </nav>
  );
}
