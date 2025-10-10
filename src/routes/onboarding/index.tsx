import { createFileRoute } from "@tanstack/react-router";
import { ConnectWallet } from "../../../blocks/onboarding/connect-wallet";

export const Route = createFileRoute("/onboarding/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ConnectWallet />
    </div>
  );
}
