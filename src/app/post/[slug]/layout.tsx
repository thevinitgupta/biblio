import React from "react";

interface PostLayoutProps {
  children: React.ReactNode;
  main: React.ReactNode;
  similar: React.ReactNode;
  params: { slug: string };
}

const PostLayout = ({ children, main, similar, params }: PostLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid place-content-center grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">{main}</div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">{similar}</div>
        </div>
      </div>

      {/* Fallback children if needed */}
      {children}
    </div>
  );
};

export default PostLayout;
