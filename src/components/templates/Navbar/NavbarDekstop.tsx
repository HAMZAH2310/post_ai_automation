import Link from "next/link";

export default function NavbarDesktop() {
  return(
    <main>
      <div className="flex items-center space-x-8">
        <nav className="flex space-x-6">
         <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
         <Link href="/history" className="text-gray-600 hover:text-blue-600 font-medium">Riwayat</Link>
         <Link href="/settings" className="text-gray-600 hover:text-blue-600 font-medium">Pengaturan</Link>
        </nav>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right">
            <p className="text-xs text-gray-400">Halo</p>
            <p className="text-sm font-semibold text-gray-700">Davinci Automation</p>
          </div>
        </div>
      </div>
    </main>
  )
}