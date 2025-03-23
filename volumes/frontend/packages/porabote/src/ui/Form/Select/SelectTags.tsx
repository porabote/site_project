import React from "react";
import SelectTag from "./SelectTag";
import {SelectTagsProps} from "../FormTypes";

const SelectTags = (props: SelectTagsProps) => {

  const removeTag = (tagValue: number | string) => {
    props.value.delete(tagValue);
    props.context.setValue(props.name, props.value, "replace")
  }

  const getTags = () => {

    let tagsElements: any[] = [];

    if (props.value) {
      props.value.forEach((
        itemvalue: string | number,
        valueAgain: string | number,
        set: Set<string | number>
      ) => {
        let element = (typeof props.setTagTitle == "function") ?
          props.setTagTitle(itemvalue, props.storage, props.storageMap)
          : itemvalue;
        tagsElements.push(
          <SelectTag
            child={element}
            removeTag={removeTag}
            value={itemvalue}
            key={itemvalue}
          />
        )
      });
    }

    return tagsElements;
  }

  return (
    <div>
      <div className={props.value && props.value.size ? "select-tags active" : "select-tags"}>
        {getTags().map((item: any) => item)}
      </div>
    </div>
  );

}

export default SelectTags;
