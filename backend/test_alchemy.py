import asyncio

from app.blockchain.clients.alchemy import AlchemyClient


ADDRESS = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"


async def main():
    client = AlchemyClient()

    print("RPC TEST START")

    balance = await client.get_native_balance(ADDRESS)

    print("Wei balance:")
    print(balance)

    eth = balance / 10**18

    print("ETH balance:")
    print(eth)


if __name__ == "__main__":
    asyncio.run(main())
