import { useState } from "react";
import { SignMessageForm } from "~/components/index/SignMessageForm";
import { Header } from "~/components/layout/Header";

export default function Index() {
  const [signature, setSignature] = useState<string | null>(null);

  return (
    <>
      <Header />
      <main>
        {signature === null ? (
          <SignMessageForm setSignature={setSignature} />
        ) : (
          <div className="card">
            <h4 className="flex"><img src="/images/wallet.svg" alt="Wallet icon" /> Your signature</h4>
            <p className="signature break-words">{signature}</p>
          </div>
        )}
      </main>
    </>
  );
}
