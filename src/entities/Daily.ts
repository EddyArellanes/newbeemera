import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Transaction } from "./Transaction";

@Index("daily_pkey", ["id"], { unique: true })
@Entity("daily", { schema: "public" })
export class Daily {
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

  @OneToMany(() => Transaction, (transaction) => transaction.idDaily)
  transactions: Transaction[];
}
