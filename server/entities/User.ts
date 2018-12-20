import {
    Entity,
    Column,
    BaseEntity,
    BeforeInsert,
    PrimaryColumn
} from "typeorm";
import bcrypt from "bcrypt";
import {Field, InputType, ObjectType} from "type-graphql";
import {IsEmail, Length} from "class-validator";

@Entity()
@ObjectType()
@InputType("UserInput")
export default class User extends BaseEntity {
    @Field({nullable: true})
    @Length(3, 255)
    @PrimaryColumn()
    username: string;

    @Field({nullable: true})
    @Length(6, 255)
    @Column()
    password: string;

    @Field({nullable: true})
    @IsEmail()
    @Column({unique: true})
    email: string;

    @Field({nullable: true})
    @Column({default: false})
    confirmed: boolean;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }
}