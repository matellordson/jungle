import { WalletConnect } from "../components/WalletConnect";
import { Auth } from "../components/Auth";
import { UserData } from "../components/UserData";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Web3 Auth Demo
          </h1>
          <p className="text-gray-600">
            Cookie-based authentication with wallet signatures
          </p>
        </div>

        <div className="space-y-4 p-6 bg-white border rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800">
            Step 1: Connect Wallet
          </h2>
          <WalletConnect />
        </div>

        <div className="space-y-4 p-6 bg-white border rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800">
            Step 2: Authenticate
          </h2>
          <Auth />
        </div>

        <div className="space-y-4 p-6 bg-white border rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800">
            Step 3: Access Protected Data
          </h2>
          <UserData />
        </div>
      </div>
    </main>
  );
}
