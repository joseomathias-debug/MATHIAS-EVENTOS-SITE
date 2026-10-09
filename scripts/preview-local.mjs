import { fileURLToPath } from 'node:url';
import { startProdServer } from 'vinext/server/prod-server';

// Vinext 0.0.50 indexes nested assets with path.relative() (backslashes on
// Windows) but looks them up using URL paths. Normalize only this local
// preview's cache; never modify the shared dependency or production bundle.
if (process.platform === 'win32') {
  const { StaticFileCache } = await import(new URL('./static-file-cache.js', import.meta.resolve('vinext/server/prod-server')));
  const create = StaticFileCache.create;
  StaticFileCache.create = async function (...args) {
    const cache = await create.apply(this, args);
    if (!(cache.entries instanceof Map)) throw new Error('Vinext static cache API changed; review the Windows preview compatibility fix.');
    for (const [key, value] of [...cache.entries]) {
      if (!key.includes('\\')) continue;
      cache.entries.delete(key);
      const urlPath = key.replaceAll('\\', '/');
      if (urlPath !== '/.vite' && !urlPath.startsWith('/.vite/')) cache.entries.set(urlPath, value);
    }
    return cache;
  };
}

await startProdServer({
  host: '127.0.0.1',
  port: Number(process.env.PORT ?? 3000),
  outDir: fileURLToPath(new URL('../dist/', import.meta.url)),
});
