import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../../repositories/TagsRepositories";

type TagRequest = {
  name: string;
};

class CreateTagService {
  async execute({ name }: TagRequest) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error("Invalid tag name");
    }

    const tagAlreadyExists = await tagsRepositories.findOne({
      name,
    });

    if (tagAlreadyExists) {
      throw new Error("Tag already exists");
    }

    const tag = tagsRepositories.create({
      name,
    });

    await tagsRepositories.save(tag);

    return tag;
  }
}
export { CreateTagService };
