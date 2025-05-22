import {CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

class AbstractEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    UpdatedAt: Date;
    @DeleteDateColumn()
    deletedAt: Date;
}

export default AbstractEntity;