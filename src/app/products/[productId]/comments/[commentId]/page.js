import React from "react";

async function ProductCommentById({ params }) {
  const productId = await params.productId;
  const commentId = await params.commentId;

  return (
    <div>
      Product of id: {productId} and comment of id: {commentId}
    </div>
  );
}

export default ProductCommentById;
