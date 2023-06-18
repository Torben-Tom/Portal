<p align="center">
  <a
    href="https://portal.schweren.dev"
    target="_blank"
    rel="noopener noreferrer">
    <img
      src="https://github.com/Torben-Tom/Portal/blob/aba7984cfa01ed13d7edea299e85b5bbbb1c7588/src/assets/character-portrait.png"
      alt="Portal character portrait"
      title="Portal character portrait"
      style="width: 300px">
  </a>
</p>

<p align="center">
  <a
    href="https://github.com/Torben-Tom/Portal/actions/workflows/main.yml"
    target="_blank"
    rel="noopener noreferrer">
    <img
      src="https://github.com/Torben-Tom/Portal/actions/workflows/main.yml/badge.svg"
      alt="GitHub & Docker Artifacts"
      title="GitHub & Docker Artifacts">
  </a>
</p>

# Portal

A web-based 2D clone of Valve's famous puzzle game, Portal

## Pipeline Status

### Stable build

[![GitHub & Docker Artifacts](https://github.com/Torben-Tom/Portal/actions/workflows/main.yml/badge.svg)](https://github.com/Torben-Tom/Portal/actions/workflows/main.yml)

### Beta build

[![Build and deploy release](https://github.com/Torben-Tom/Portal/actions/workflows/staging.yml/badge.svg)](https://github.com/Torben-Tom/Portal/actions/workflows/staging.yml)

## Play

You can play the game right in your browser on https://portal.schweren.dev

## Instructions

| Key | Action |
| --- | ------ |
| Arrow Left | Run left |
| A | Run left |
| Arrow Right | Run right |
| D | Run right |
| Arrow Up | Jump |
| W | Jump |
| Space | Jump |
| Left Click | Shoot purple portal |
| Right Click | Shoot green portal |
| B | Debug view (for nerds) |

## Installation

### Current Version

Version = 0.1.0 (creation date = 19.06.2023)

### Docker

1. Run `docker run --rm -p PORT:80 -d torbentom/portal:latest`
2. Navigate to http://localhost:PORT

### Manual

1. Navigate to [Releases](https://github.com/Torben-Tom/Portal/releases)
2. Download release
3. Drop files into a web server like nginx or apache
4. Connect to your web server

### Browser compatibility

| Browser | Status |
| ------- | ------ |
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Other browser | Will probably also work |

## Credits & Licenses of assets

- Sour code license: Apache License ([view LICENSE file](https://github.com/Torben-Tom/Portal/blob/main/LICENSE))

- Player, Buttons, Background: https://github.com/Chinnami
- Portals: https://www.patreon.com/posts/27430241
- Blocks: https://craftpix.net/file-licenses/
- CompanionCube: https://www.pixilart.com/terms
- favicon: https://www.favicon.cc/?action=icon&file_id=359150
- Music: https://www.fesliyanstudios.com/policy

## Development & Authors

Project Board: https://github.com/orgs/Torben-Tom/projects/1

- Engine: mostly Torben Schweren
- Game: mostly Tom Moritz
- Pipeline: Torben Schweren

The exact partial contributions can be found in the "Done" column of the Broject Board.

- known Bugs: view the "Backlog" column of the Project Board
