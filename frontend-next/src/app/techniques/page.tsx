export default function TechniquesPage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Cooking Techniques
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Placeholder for technique cards */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Coming Soon!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Cooking techniques and tips are on the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
