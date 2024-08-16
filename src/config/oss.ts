process.env.NODE_ENV = "dev";

const ProductConfig = {
    accessKeyId: "accessKeyId",
    accessKeySecret: "accessKeySecret",
    bucket: "bucket",
    region: "region",
};

const DevelopConfig = {
    accessKeyId: "accessKeyId",
    accessKeySecret: "accessKeySecret",
    bucket: "bucket",
    region: "region",
};

export const OssConfig = process.env.NODE_ENV === "pro" ? ProductConfig : DevelopConfig;
