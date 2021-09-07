import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'vehicle_type' })
@Unique(['make', 'model', 'year'])
export class VehicleTypeEntity {
	@PrimaryGeneratedColumn('rowid')
	id!: number;

	@Column({ type: 'citext', nullable: false })
	make!: string;

	@Column({ type: 'citext', nullable: false })
	model!: string;

  @Column({ nullable: false })
	year!: number;
}