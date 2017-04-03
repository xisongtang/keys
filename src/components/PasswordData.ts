import * as CryptoJS from "crypto-js";

const DEFAULT_PASSWORD:string = "password";

export class PasswordData {
    static HASH_TYPE: ReadonlyArray<string> = ["MD5", "SHA1", "SHA256", "SHA224", "SHA384", "SHA512", "RIPEMD160"];

    static HASHER: Readonly<{ [key: string]: CryptoJS.lib.Hasher; }> = { MD5: CryptoJS.algo.MD5, SHA1: CryptoJS.algo.SHA1, SHA256: CryptoJS.algo.SHA256, SHA224: CryptoJS.algo.SHA224, SHA384: CryptoJS.algo.SHA384, SHA512: CryptoJS.algo.SHA512, RIPEMD160: CryptoJS.algo.RIPEMD160 };

    static ALPHABET: Readonly<string> = "0123456789012345678901234567890123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~!@#$%^&*()_+-={}|<>,.{}[];:'\"\\";

    public website: string = "";
    public accountId: string = "";
    public password: string = DEFAULT_PASSWORD;
    public hashType: string = PasswordData.HASH_TYPE[0];
    public digitNumber: number = 16;
    public genPassword: string;

    constructor() {
        this.genPassword = PasswordData.generatePassword(this);
    }

    setWebsite(website:string) {
        this.website = website;
        this.genPassword = PasswordData.generatePassword(this);
    }

    setAccountId(accountId:string) {
        this.accountId = accountId;
        this.genPassword = PasswordData.generatePassword(this);
    }

    setPassword(password:string) {
        this.password = password;
        this.genPassword = PasswordData.generatePassword(this);
    }

    setHashType(hashType:string) {
        this.hashType = hashType;
        this.genPassword = PasswordData.generatePassword(this);
    }

    setDigitNumber(digitNumber:number) {
        this.digitNumber = digitNumber;
        this.genPassword = PasswordData.generatePassword(this);
    }

    static create(data?: Readonly<PasswordData>): PasswordData {
        if (!data) {
            return new PasswordData;
        } else {
            let result:PasswordData = new PasswordData;
            result.website = data.website;
            result.accountId = data.accountId;
            result.digitNumber = data.digitNumber ? data.digitNumber : 16;
            result.hashType = data.hashType ? data.hashType : PasswordData.HASH_TYPE[0];
            result.password = data.password ? data.password : DEFAULT_PASSWORD;
            result.genPassword = PasswordData.generatePassword(result);
            return result;
        }
    }

    static generatePassword(data: PasswordData): string {
        let website: string = data.website as string, password: string = data.password as string, accountId: string = data.accountId as string, digitNumber = data.digitNumber;
        let salt: string = website + accountId;
        let wordArray: CryptoJS.lib.WordArray = CryptoJS.PBKDF2(password, salt, {
            keySize: digitNumber, iterations: 100, hasher: PasswordData.HASHER[data.hashType as string]
        });
        let result: string = wordArray.words.map((v: number, i: number) => {
            if (digitNumber === undefined || i >= digitNumber) return;
            let index: number = v % PasswordData.ALPHABET.length;
            index < 0 && (index += PasswordData.ALPHABET.length);
            return PasswordData.ALPHABET[index];
        }).join('');
        return result;
    }
}