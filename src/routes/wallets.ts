import {Router} from "express";
import { validate } from '../middlewares/validate';
import {handlerUpsertWallet, schemaUpsertWallet } from "../controllers/wallets/upsertWallet";
import {handlerGetWallets} from "../controllers/wallets/getWallets";
import {getWalletById} from "../controllers/wallets/getWallets/handler";
import {initServerless} from '../server-sls';
const router = Router();

router.get("/wallets", handlerGetWallets);
router.get("/wallets/:walletId", getWalletById);
router.post("/wallets", validate(schemaUpsertWallet), handlerUpsertWallet);

export const walletsSeverless: any = initServerless();

export default router;