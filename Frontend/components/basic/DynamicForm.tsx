import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon,DollarSign } from "lucide-react";
import FormField from "@/types/FormField.interface"

// Typage des props du composant
interface DynamicFormProps<T> {
  title: string;
  fields: FormField[];
  onSubmit: (data: T) => void;
  Icon?: LucideIcon;
}

export default function DynamicForm<T>({ title, fields, onSubmit, Icon }: DynamicFormProps<T>) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as T);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
          {Icon && <Icon className="mr-2" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <Label htmlFor={field.name} className="text-lg">{field.label}</Label>
              {field.type === "select" ? (
                <Select
                  value={formData[field.name] || ""}
                  onValueChange={(value) => handleChange(field.name, value)}
                  required={field.required}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option, idx) => (
                      <SelectItem key={idx} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              )}
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button type="submit" className="w-full">
            <DollarSign className="mr-2" />
              Valider
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
}
