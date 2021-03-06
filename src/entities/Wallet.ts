import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Transaction } from "./Transaction";
import { Category } from "./Category";

@Index("wallet_pkey", ["id"], { unique: true })
@Entity("wallet", { schema: "public" })
export class Wallet {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("text", { name: "color", nullable: true, default: () => "'#000000'" })
  color: string | null;

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

  @OneToMany(() => Transaction, (transaction) => transaction.idWallet)
  transactions: Transaction[];

  @ManyToOne(() => Category, (category) => category.wallets, {
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_category", referencedColumnName: "id" }])
  idCategory: Category;
}
