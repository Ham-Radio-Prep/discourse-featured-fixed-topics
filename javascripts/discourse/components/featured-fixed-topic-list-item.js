import Component from "@ember/component";
import discourseComputed from "discourse-common/utils/decorators";
import Topic from "discourse/models/topic";
import { ajax } from "discourse/lib/ajax";

const excerptLength = 70;

export default Component.extend({
  classNames: ['featured-topic'],
  loading: false,

  init() {
    this._super(...arguments);

    this.set("loading", true);

    Topic.find(this.topicId, {}).then((response) => {
      this.set("loading", false);
      this.set("topic", Topic.create(response));
    });
  },

  @discourseComputed("topic")
  excerpt(topic) {
    if (!topic) {
      return;
    }

    const div = document.createElement("div");
    div.innerHTML = this.topic.post_stream.posts[0].cooked;
    div.getElementsByTagName("div")

    div.querySelectorAll("div").forEach(element => {
      element.innerHTML = ''
    });

    const excerpt = div.textContent;

    if (excerpt.length > excerptLength) {
      this.set("excerptTruncated", true);
    }

    return excerpt.slice(0 , excerptLength);
  },
});