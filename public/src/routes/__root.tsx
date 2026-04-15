import { Outlet, HeadContent, Link, Scripts } from "@tanstack/react-router";
import '../styles.css';

function RootComponent() {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <link rel="stylesheet" href="../styles.css" />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

export default RootComponent;

