import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Daily } from "./Daily";
import { Wallet } from "./Wallet";

@Index("_transaction_pkey", ["id"], { unique: true })
@Entity("_transaction", { schema: "public" })
export class Transaction {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "type", nullable: true })
  type: string | null;

  @Column("text", { name: "color", nullable: true, default: () => "'#000000'" })
  color: string | null;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("real", { name: "amount", precision: 24, default: () => "0" })
  amount: number;

  @Column("date", { name: "created_at", nullable: true })
  createdAt: string | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @ManyToOne(() => Daily, (daily) => daily.transactions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_daily", referencedColumnName: "id" }])
  idDaily: Daily;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_wallet", referencedColumnName: "id" }])
  idWallet: Wallet;
}
