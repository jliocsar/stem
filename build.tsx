import * as os from 'node:os'
import * as fs from 'node:fs'
import * as path from 'node:path'
import Html from '@kitajs/html'
import prettyMilliseconds from 'pretty-ms'
import { getGPUTier } from 'detect-gpu'
import nodeDiskInfo from 'node-disk-info'
import { css } from './styles'

function bytesToMb(bytes: number) {
  return Math.ceil(bytes / Math.pow(1024, 2))
}

function isIpv6(...addresses: string[]) {
  return addresses.some(address => /::/.test(address))
}

async function stem() {
  const logo = await Bun.file(path.resolve(import.meta.dir, 'logo.txt')).text()
  const memory = bytesToMb(os.totalmem())
  const freeMemory = bytesToMb(os.freemem())
  const uptime = prettyMilliseconds(os.uptime() * 1000)
  const cpus = os.cpus()
  const gpu = await getGPUTier()
  const userInfo = os.userInfo()
  const disks = nodeDiskInfo.getDiskInfoSync()
  const [{ model: cpuModel }] = cpus

  return (
    <html>
      <head>
        <title>System Info</title>
        <style>{css.trim()}</style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header>
          <div class="logo-wrapper">
            <h1 style="display:none;">System Information</h1>
            <pre>{logo}</pre>
          </div>
        </header>
        <p class="subtitle">Currently running on a {os.type()} system</p>
        <main>
          <div class="section-wrapper">
            <section class="system-os">
              <h2>System/OS</h2>
              <p>
                <span>Hostname:</span> {os.hostname()}
              </p>
              <p>
                <span>Username:</span> {userInfo.username}
              </p>
              <p>
                <span>Home Directory:</span> {os.homedir()}
              </p>
              <p>
                <span>Temp Directory:</span> {os.tmpdir()}
              </p>
              <p>
                <span>Uptime:</span> {uptime}
              </p>
            </section>
          </div>
          <div class="section-wrapper">
            <section class="network">
              <h2>Network</h2>
              <span>Interfaces</span>
              <ul>
                {Object.entries(os.networkInterfaces()).map(
                  ([name, interfaces]) => (
                    <li>
                      {name}
                      <ul>
                        {interfaces?.map(facedeez =>
                          isIpv6(facedeez.address, facedeez.netmask) ? null : (
                            <li>
                              {facedeez.address} ({facedeez.netmask})
                            </li>
                          ),
                        )}
                      </ul>
                    </li>
                  ),
                )}
              </ul>
            </section>
          </div>
          <div class="section-wrapper">
            <section class="platform">
              <h2>Platform</h2>
              <p>
                <span>Release:</span> {os.release()}-{os.arch()}
              </p>
              <p>
                <span>Version:</span> {os.version()}
              </p>
              <p>
                <span>Endianness:</span> {os.endianness()}
              </p>
            </section>
          </div>
          <div class="section-wrapper">
            <section class="cpu">
              <h2>CPU</h2>
              <p>
                <span>Model:</span> {cpuModel}
              </p>
              <p>
                <span>Threads:</span> {os.cpus().length}
              </p>
            </section>
          </div>
          <div class="section-wrapper">
            <section class="gpu">
              <h2>GPU</h2>
              <p>
                <span>Model:</span> {gpu.gpu || '-'}
              </p>
              <p>
                <span>Type:</span> {gpu.type || '-'}
              </p>
              <p>
                <span>Device:</span> {gpu.device || '-'}
              </p>
              <p>
                <span>Tier:</span> {gpu.tier || '-'}
              </p>
            </section>
          </div>
          <div class="section-wrapper">
            <section class="memory">
              <h2>Memory</h2>
              <p>
                <span>Total:</span> {memory}mb
              </p>
              <p>
                <span>Free:</span> {freeMemory}mb
              </p>
            </section>
          </div>
          <div class="section-wrapper">
            <section class="disk-information">
              <h2>Disk Information</h2>
              <ul>
                {disks
                  .sort((a, b) => a.mounted.localeCompare(b.mounted))
                  .map(disk => (
                    <li>
                      <span>File system</span> {disk.filesystem} <br />
                      <span>Blocks</span> {disk.blocks} <br />
                      <span>Used</span> {disk.used} <br />
                      <span>Available</span> {disk.available} <br />
                      <span>Capacity</span> {disk.capacity} <br />
                      <span>Mounted</span> {disk.mounted}
                    </li>
                  ))}
              </ul>
            </section>
          </div>
        </main>
      </body>
    </html>
  )
}

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
}
const outputPath = path.resolve(import.meta.dir, './dist/index.html')
await Bun.write(outputPath, (await stem()).toString())
process.exit()
