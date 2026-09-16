import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class CreatedModel {
    @Field(() => ID)
    id: string;

    constructor(id: string) {
        this.id = id;
    }

    static create(id: string): CreatedModel {
        return new CreatedModel(id);
    }
}