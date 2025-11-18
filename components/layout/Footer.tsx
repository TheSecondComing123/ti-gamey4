export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} TI-GAMEY4</p>
        </div>
      </div>
    </footer>
  );
}
