#! /usr/bin/env python3

####################################################################################################

import aiohttp
import asyncio
import colorama
import bs4

targ1 = {
    'name': 'Jimmy Gizmo Website - Ninth Device',
    'code': 'NtDv',
    'url': 'http://www.ninthdevice.com'
}

targ2 = {
    'name': 'SF Gate News Site',
    'code': 'SfGt',
    'url': 'http://www.sfgate.com/'
}

targ3 = {
    'name': 'Ninth Device',
    'code': 'NtDv',
    'url': 'http://www.ninthdevice.com'
}

targets = [targ1, targ2, targ3]

one_target = targ2


async def fetch(session: aiohttp.ClientSession, url: str) -> str:
    print(colorama.Fore.MAGENTA + "fetch: aiohttp issuing HTTP request", flush=True)
    async with session.get(url) as response:
        return await response.text()


def get_title(html: str) -> str:
    print(colorama.Fore.CYAN + f"Extracting TITLE from the HTML", flush=True)
    soup = bs4.BeautifulSoup(html, 'html.parser')
    title = soup.find('title')
    if not title:
        return '(NO TITLE)'

    return title.text.strip()


async def process_target(target: dict):
    print(colorama.Fore.YELLOW + f"HTTP Async Get request for target: {target['code']}", flush=True)
    print(colorama.Fore.YELLOW + f"URL: {target['url']}", flush=True)

    async with aiohttp.ClientSession() as session:
        html = await fetch(session, target['url'])
        title = get_title(html)
        print(colorama.Fore.YELLOW + f"{target['code']}: {title}", flush=True)



async def main(targets: list):
    pass
    # TODO: Next will process many targets at once


loop = asyncio.get_event_loop()
loop.run_until_complete(process_target(one_target))



##
#
