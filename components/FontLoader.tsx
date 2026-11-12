/**
 * Loads Material Symbols icon font strictly on private auth/developer routes
 * rather than blocking public marketing pages.
 */
export default function FontLoader() {
  return (
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    />
  );
}
