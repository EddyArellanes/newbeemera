import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Wallet } from "./Wallet";

@Index("category_pkey", ["id"], { unique: true })
@Entity("category", { schema: "public" })
export class Category {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("text", { name: "color", nullable: true, default: () => "'#000000'" })
  color: string | null;

  @Column("date", { name: "created_at", nullable: true })
  createdAt: string | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @OneToMany(() => Wallet, (wallet) => wallet.idCategory)
  wallets: Wallet[];
}
