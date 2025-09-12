import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { authenticate } from '@google-cloud/local-auth';
import { logger } from '../Handlers/logger.js';
import config from './config.js';
import { google } from 'googleapis';

const SHEET_SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

class GoogleAuth {
    constructor() {
        this.auth = null;
    }

    async #loadSavedCredentialsIfExist() {
        try {
            const content = await fs.readFile(TOKEN_PATH);
            const credentials = JSON.parse(content);
            return google.auth.fromJSON(credentials);
        } catch (err) {
            logger.error('Error loading saved credentials:', err);
            process.exit(1);
        }
    }

    async #saveCredentials(client) {
        try {
            const content = await fs.readFile(CREDENTIALS_PATH);

            const keys = JSON.parse(content);
            const key = keys.installed || keys.web;

            const payload = JSON.stringify({
                type: 'authorized_user',
                client_id: key.client_id,
                client_secret: key.client_secret,
                refresh_token: client.credentials.refresh_token,
            });

            // save token to file system
            await fs.writeFile(TOKEN_PATH, payload);
        } catch (err) {
            logger.error('Error saving token.json:', err);
            process.exit(1);
        }
    }

    async #createAuth() {
        let authCred = await this.#loadSavedCredentialsIfExist();
        if (authCred) {
            this.auth = authCred;
            return;
        }

        authCred = await authenticate({
            scopes: SHEET_SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });

        if (authCred.credentials) {
            await this.#saveCredentials(authCred);
        }

        this.auth = authCred;
    }

    async getAuth() {
        if (config.googleAuthCredentials !== undefined && config.googleAuthToken !== undefined) {
            // Use credentials and token from config if available
            await fs.writeFile(CREDENTIALS_PATH, JSON.stringify(config.googleAuthCredentials));
            await fs.writeFile(TOKEN_PATH, JSON.stringify(config.googleAuthToken));
        }

        await this.#createAuth();
        return this.auth;
    }
}

// Create a singleton instance
const googleAuthInstance = new GoogleAuth();
export default googleAuthInstance;