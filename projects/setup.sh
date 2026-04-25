#!/bin/bash

echo "🚀 Setting up Conflux Milestone Escrow AI Agent..."
printf '%.0s─' {1..50} && echo

# Check Node.js version
echo "📋 Checking Node.js version..."
node_version=$(node -v)
echo "Node.js version: $node_version"

# Install dependencies
echo "📦 Installing contract dependencies..."
npm install

echo "📦 Installing agent dependencies..."
cd agents
npm install
cd ..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your private key and configuration"
else
    echo "✅ .env file already exists"
fi

# Create agents .env if it doesn't exist
if [ ! -f agents/.env ]; then
    echo "📝 Creating agents/.env file..."
    cp .env agents/.env
else
    echo "✅ agents/.env file already exists"
fi

printf '%.0s─' {1..50} && echo
echo "✅ Setup completed successfully!"
echo ""
echo "📝 Next Steps:"
echo "  1. Edit .env file with your configuration"
echo "  2. Deploy contract: npm run deploy"
echo "  3. Setup gas sponsorship: npm run setup-sponsorship"
echo "  4. Run demo: npm run demo"
echo "  5. Start AI agent: cd agents && npm start"
echo ""
echo "🔗 Useful Links:"
echo "  - Conflux Faucet: https://faucet.confluxnetwork.org"
echo "  - ConfluxScan: https://evmtestnet.confluxscan.io"
echo "  - Gas Sponsorship Docs: https://developer.confluxchain.org/espace/gas-sponsorship/overview"