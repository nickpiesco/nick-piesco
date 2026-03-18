import eleventySass from "eleventy-sass";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItMedia from "@gotfeedback/markdown-it-media";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets/**");

  eleventyConfig.addPlugin(eleventySass, {
    sass: {
      includes: "_includes/scss",
      style: "compressed",
    },
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addTemplateFormats("scss");

  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("./_posts/*.md").reverse(),
  );

  eleventyConfig.addFilter("dropContentFolder", (path) => {
    const pathToDrop = "/_posts";

    if (path.indexOf(pathToDrop) !== 0) {
      return path;
    }

    return path.slice(pathToDrop.length);
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  const markdownItAnchorOptions = {
    level: 2,
  };

  const markdownItMediaOptions = {
    controls: true,
    attrs: {
      video: { autoplay: "autoplay", loop: true },
    },
  };

  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true })
      .use(markdownItAnchor, markdownItAnchorOptions)
      .use(markdownItMedia, markdownItMediaOptions),
  );
}
