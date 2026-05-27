import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Settings, Search, ArrowDown, BarChart3, Wallet, Menu, X } from "lucide-react";

export const Route = createFileRoute("/")({
  component: SwapPage,
  head: () => ({
    meta: [
      { title: "Swap | PancakeSwap-style DEX" },
      { name: "description", content: "Trade tokens in an instant — swap interface clone." },
    ],
  }),
});

type Tab = "Swap" | "TWAP" | "Limit";

const TAB_LINKS: Record<Tab, string> = {
  Swap: "https://pancakeswap.finance/swap",
  TWAP: "https://pancakeswap.finance/swap?showTwap=true",
  Limit: "https://pancakeswap.finance/limit-orders",
};

const NAV_LINKS = [
  { label: "Trade", href: "https://pancakeswap.finance/swap" },
  { label: "Perps", href: "https://perp.pancakeswap.finance/en/futures/v2/BTCUSD", badge: "New" },
  { label: "Earn", href: "https://pancakeswap.finance/farms" },
  { label: "Play", href: "https://pancakeswap.finance/prediction" },
  { label: "AI", href: "https://pancakeswap.finance/cakepie" },
  { label: "FAQ", href: "https://docs.pancakeswap.finance/" },
];

const WALLETS = [
  { name: "Metamask", icon: "🦊", url: "https://metamask.io/download/" },
  { name: "Trust Wallet", icon: "🛡️", url: "https://trustwallet.com/download" },
  { name: "WalletConnect", icon: "🔗", url: "https://walletconnect.com/" },
  { name: "Binance Wallet", icon: "🟡", url: "https://www.binance.com/en/web3wallet" },
  { name: "Coinbase Wallet", icon: "🔵", url: "https://www.coinbase.com/wallet" },
  { name: "Opera Wallet", icon: "🅾️", url: "https://www.opera.com/crypto/next" },
  { name: "Brave Wallet", icon: "🦁", url: "https://brave.com/wallet/" },
  { name: "Rabby", icon: "🐰", url: "https://rabby.io/" },
  { name: "MathWallet", icon: "➗", url: "https://mathwallet.org/" },
  { name: "TokenPocket", icon: "💼", url: "https://www.tokenpocket.pro/" },
  { name: "SafePal", icon: "🔐", url: "https://safepal.com/" },
  { name: "Ledger", icon: "📒", url: "https://www.ledger.com/" },
  { name: "Trezor", icon: "🔑", url: "https://trezor.io/" },
  { name: "Phantom", icon: "👻", url: "https://phantom.app/" },
  { name: "Petra (Aptos)", icon: "🪨", url: "https://petra.app/" },
  { name: "Blocto", icon: "🟦", url: "https://blocto.io/" },
];

function SwapPage() {
  const [tab, setTab] = useState<Tab>("Swap");
  const [fromAmount, setFromAmount] = useState("0.00");
  const [toAmount, setToAmount] = useState("0.00");
  const [walletOpen, setWalletOpen] = useState(false);

  const chains = [
    { name: "ETH", color: "#627EEA", letter: "Ξ" },
    { name: "BNB", color: "#F0B90B", letter: "B" },
    { name: "Base", color: "#0052FF", letter: "↔" },
    { name: "Arb", color: "#2D374B", letter: "A" },
    { name: "Linea", color: "#61DFFF", letter: "L" },
    { name: "zk", color: "#1E1E1E", letter: "■" },
    { name: "Aptos", color: "#06B6A8", letter: "≋" },
    { name: "Sol", color: "#9945FF", letter: "◎" },
    { name: "opBNB", color: "#F0B90B", letter: "B" },
    { name: "Mode", color: "#DFFE00", letter: "M" },
  ];

  return (
    <div className="min-h-screen">
      <Header onConnect={() => setWalletOpen(true)} />
      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-8 lg:pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              <span className="text-primary block">Everyone's</span>
              <span className="block bg-gradient-to-r from-[#7645D9] to-[#A881FC] bg-clip-text text-transparent">
                Favorite DEX
              </span>
            </h1>
            <p className="mt-8 text-xl lg:text-2xl font-bold text-foreground">
              Trade Crypto Instantly Across 10 Chains
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {chains.map((c) => (
                <a
                  key={c.name}
                  href="https://pancakeswap.finance/swap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm hover:scale-110 transition"
                  style={{ background: c.color }}
                  title={c.name}
                >
                  {c.letter}
                </a>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 w-full max-w-[480px] mx-auto lg:ml-auto">
            <div className="bg-card rounded-[28px] p-4 shadow-[0_2px_12px_rgba(74,74,104,0.08)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1 bg-input-bg rounded-2xl p-1">
                  {(["Swap", "TWAP", "Limit"] as Tab[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTab(t);
                        window.open(TAB_LINKS[t], "_blank", "noopener,noreferrer");
                      }}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                        tab === t
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <a
                  href="https://pancakeswap.finance/info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-cyan hover:bg-accent rounded-xl"
                  aria-label="Chart"
                >
                  <BarChart3 size={18} />
                </a>
              </div>

              <TokenInput label="From" symbol="BNB" chain="BNB Chain" colors={["#F0B90B", "#FCD535"]} amount={fromAmount} onAmount={setFromAmount} />
              <div className="flex justify-center -my-2 relative z-10">
                <button
                  onClick={() => {
                    setFromAmount(toAmount);
                    setToAmount(fromAmount);
                  }}
                  className="bg-card border-4 border-background rounded-2xl p-1.5 text-cyan hover:rotate-180 transition-transform duration-300"
                  aria-label="Switch"
                >
                  <ArrowDown size={18} strokeWidth={2.5} />
                </button>
              </div>
              <TokenInput label="To" symbol="CAKE" chain="BNB Chain" colors={["#7645D9", "#A881FC"]} amount={toAmount} onAmount={setToAmount} />

              <button
                onClick={() => setWalletOpen(true)}
                className="mt-4 w-full bg-cyan text-cyan-foreground font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition shadow-[0_-2px_0_rgba(0,0,0,0.1)_inset]"
              >
                Get Started <Wallet size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {walletOpen && <WalletModal onClose={() => setWalletOpen(false)} />}
    </div>
  );
}

function WalletModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-[28px] w-full max-w-[480px] max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-primary">Connect Wallet</h2>
          <button onClick={onClose} className="p-1 hover:bg-accent rounded-lg text-muted-foreground" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto p-4 grid grid-cols-2 gap-2">
          {WALLETS.map((w) => (
            <a
              key={w.name}
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-input-bg transition"
            >
              <div className="w-10 h-10 rounded-xl bg-input-bg flex items-center justify-center text-xl shrink-0">
                {w.icon}
              </div>
              <span className="font-semibold text-sm text-foreground">{w.name}</span>
            </a>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-border text-xs text-muted-foreground text-center">
          Haven't got a crypto wallet yet?{" "}
          <a
            href="https://docs.pancakeswap.finance/readme/get-started/connection-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-bold hover:underline"
          >
            Learn How to Connect
          </a>
        </div>
      </div>
    </div>
  );
}

function TokenInput({
  label,
  symbol,
  chain,
  colors,
  amount,
  onAmount,
}: {
  label: string;
  symbol: string;
  chain: string;
  colors: [string, string];
  amount: string;
  onAmount: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-sm font-semibold text-muted-foreground mb-2 px-1">{label}</div>
      <div className="bg-input-bg rounded-2xl p-3 flex items-center gap-3">
        <a
          href="https://pancakeswap.finance/swap"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-card rounded-2xl pl-1 pr-3 py-1 hover:bg-accent transition shrink-0"
        >
          <div className="relative">
            <div
              className="w-8 h-8 rounded-full"
              style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#F0B90B] border-2 border-card" />
          </div>
          <div className="text-left leading-tight">
            <div className="font-bold text-sm flex items-center gap-1">
              {symbol} <ChevronDown size={14} />
            </div>
            <div className="text-[10px] text-muted-foreground">{chain}</div>
          </div>
        </a>
        <div className="flex-1 text-right">
          <input
            value={amount}
            onChange={(e) => onAmount(e.target.value)}
            className="w-full bg-transparent text-right text-2xl font-bold outline-none text-foreground placeholder:text-muted-foreground"
            placeholder="0.00"
            inputMode="decimal"
          />
          <div className="text-xs text-muted-foreground">~0 USD</div>
        </div>
      </div>
    </div>
  );
}

function Header({ onConnect }: { onConnect: () => void }) {
  return (
    <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <a
            href="https://pancakeswap.finance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-bold text-primary text-lg"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FEDC90] to-[#D1884F] flex items-center justify-center text-base">
              🐰
            </div>
            <span className="hidden sm:inline">PancakeSwap</span>
            <ChevronDown size={16} />
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
            {NAV_LINKS.map((n, i) => (
              <a
                key={n.label}
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${i === 0 ? "text-primary" : "text-muted-foreground hover:text-foreground"} flex items-center gap-1.5`}
              >
                {n.label}
                {n.badge && (
                  <span className="text-[10px] bg-cyan/20 text-cyan px-2 py-0.5 rounded-full">{n.badge}</span>
                )}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://pancakeswap.finance/swap"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-input-bg text-muted-foreground px-3 py-2 rounded-2xl text-sm"
          >
            <Search size={16} />
            <span className="pr-8">Search</span>
            <kbd className="bg-card px-1.5 rounded text-xs">/</kbd>
          </a>
          <a
            href="https://pancakeswap.finance/swap"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground rounded-xl bg-input-bg inline-flex"
            aria-label="Settings"
          >
            <Settings size={18} />
          </a>
          <button
            onClick={onConnect}
            className="bg-cyan text-cyan-foreground font-bold px-4 py-2 rounded-2xl text-sm hover:opacity-90"
          >
            Connect Wallet
          </button>
          <button className="md:hidden p-2 text-foreground" aria-label="Menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
