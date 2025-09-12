import { logger } from '../Handlers/logger.js';

const BASE_URL = 'https://r.jina.ai/';

export default async function urlToMarkdown(url) {
    if (!url || url === '') {
        return null;
    }

    const cleanUrl = url.replace(/^https?:\/\/(?:www\.)?/, '');
    const apiUrl = `${BASE_URL}/${cleanUrl}`;

    const response = await fetch(apiUrl)
        .then((res) => {
            if (res.ok) {
                return res.text();
            } else if (res.status >= 400 && res.status < 500) {
                logger.warn(`Error fetching ${apiUrl}`, res.status, res.statusText);
                return null;
            } else if (res.status >= 500) {
                logger.error(`Error fetching ${apiUrl}`, res.status, res.statusText);
                return null;
            }
        })
        .then((data) => data);

    return response;
}