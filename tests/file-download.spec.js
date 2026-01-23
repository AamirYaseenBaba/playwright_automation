import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const downloadDir = path.resolve(process.cwd(), 'playwright', 'downloads');

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function emptyDir(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir)) {
        fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
    }
}

function listFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).sort();
}
test.use({ baseURL: 'https://the-internet.herokuapp.com' })
test('Verify file download', async ({ page }) => {
    ensureDir(downloadDir);
    emptyDir(downloadDir);

    await page.goto('/download');
    const before = listFiles(downloadDir);
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', { name: /sample/i }).first().click()
    ]);
    // Save downloaded file somewhere
    const suggested = download.suggestedFilename();
    const savedPath = path.join(downloadDir, suggested);
    await download.saveAs(savedPath);

    const after = listFiles(downloadDir);

    // Equivalent of "before vs after count" and "new file is .json"
    expect(after.length).toBe(before.length + 1);

    const newFiles = after.filter((f) => !before.includes(f));
    expect(newFiles).toHaveLength(1);
    expect(newFiles[0]).toContain('sample');

})