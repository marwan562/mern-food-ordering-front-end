import LoaindgButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchemaSearch = z.object({
  searchQuery: z.string().min(1, {
    message: "Search is required..!",
  }),
});

export type TFormSearch = z.infer<typeof formSchemaSearch>;

type TProps = {
  onSave: (fromData: TFormSearch) => void;
  placeHolder: string;
  isLoading?: boolean | undefined;
};

const SearchRestaurant = ({ onSave, isLoading, placeHolder }: TProps) => {
  const form = useForm<TFormSearch>({
    resolver: zodResolver(formSchemaSearch),
  });

  const errorMessage = form.formState.errors?.searchQuery?.message;

  const onSubmit = (valueForm: TFormSearch) => {
    onSave(valueForm);
  };

  const ResetQuery = () => {
    form.reset({ searchQuery: "" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={`border-2 flex flex-1  flex-row justify-between items-center p-2 m-2 md:p-3 rounded-full ${
            errorMessage ? "border-red-500" : ""
          }`}
        >
          <Search
            strokeWidth={2.5}
            size={30}
            className="ml-1 hidden md:block text-orange-500"
          />
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="flex-1  ">
                <FormControl>
                  <Input
                    {...field}
                    placeholder={placeHolder}
                    className={`bg-white text-lg  font-normal border-none focus-visible:ring-0 `}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {form.formState.isDirty && (
            <Button
              type="button"
              onClick={() => ResetQuery()}
              variant={"outline"}
              className=" rounded-r-none"
            >
              Reset
            </Button>
          )}
          <LoaindgButton isLoading={isLoading}>Search</LoaindgButton>
        </div>
        {errorMessage && (
          <div className=" text-lg text-red-500 font-medium">
            {errorMessage}
          </div>
        )}
      </form>
    </Form>
  );
};

export default SearchRestaurant;
