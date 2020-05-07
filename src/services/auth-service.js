import CommonUtils from "../utils/common-utils"


export default class AuthService {

    static async isEmailExists(email) {
        await CommonUtils.sleep(500)
        return "Yes"
    }

    static async getAuthToken(email, password) {
        await CommonUtils.sleep(500)
        return "AUTH_KEY"
    }

    static async twoFactorAuth(authKey, code) {
        await CommonUtils.sleep(500)
        return false;
    }
}
