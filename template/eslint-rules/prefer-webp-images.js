const NON_WEBP_IMAGE_PATTERN = /\.(png|jpe?g|gif|bmp)$/i;

/**
 * Flags references to non-WebP raster images (.png, .jpg, .jpeg, .gif, .bmp)
 * in imports, JSX attributes, and string literals. WebP/AVIF/SVG are allowed.
 */
function findNonWebpImage(value) {
  if (typeof value !== "string") {
    return null;
  }

  // Handle srcSet-style values ("a.png 1x, b.png 2x") and Vite suffixes
  // ("./a.png?url") by checking each path-like token.
  for (const token of value.split(/[\s,]+/)) {
    const path = token.split(/[?#]/)[0];
    if (NON_WEBP_IMAGE_PATTERN.test(path)) {
      return token;
    }
  }

  return null;
}

const preferWebpImages = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Prefer WebP images over PNG/JPEG/GIF/BMP for smaller file sizes and faster page loads",
    },
    messages: {
      preferWebp:
        'Image "{{path}}" is not WebP. Convert it at https://tools.sturge.dev/webp',
    },
    schema: [],
  },
  create(context) {
    function check(node, value) {
      const match = findNonWebpImage(value);
      if (match) {
        context.report({
          node,
          messageId: "preferWebp",
          data: { path: match },
        });
      }
    }

    return {
      Literal(node) {
        check(node, node.value);
      },
      TemplateLiteral(node) {
        if (node.quasis.length === 1) {
          check(node, node.quasis[0].value.cooked);
        }
      },
    };
  },
};

export default {
  rules: {
    "prefer-webp-images": preferWebpImages,
  },
};
