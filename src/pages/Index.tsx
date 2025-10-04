import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [comments, setComments] = useState<{ [key: number]: Array<{ author: string; text: string; time: string }> }>({
    1: [
      { author: "Читатель123", text: "Невероятная история! Жду продолжения 🔥", time: "2 часа назад" },
      { author: "ФанфикЛюбитель", text: "Очень атмосферно написано", time: "5 часов назад" }
    ]
  });
  const [newComment, setNewComment] = useState("");

  const fanfics = [
    {
      id: 1,
      title: "Тени забытого королевства",
      author: "АвторМечты",
      authorAvatar: "AM",
      rating: 4.8,
      reads: "12.5K",
      chapters: 15,
      genre: "Фэнтези",
      tags: ["Приключения", "Магия", "Романтика"],
      excerpt: "В мире, где магия давно угасла, молодая волшебница находит древний артефакт, способный вернуть былую силу...",
      status: "В процессе"
    },
    {
      id: 2,
      title: "Звёздный путь домой",
      author: "КосмоПисатель",
      authorAvatar: "КП",
      rating: 4.9,
      reads: "18.2K",
      chapters: 22,
      genre: "Фантастика",
      tags: ["Космос", "Приключения", "Дружба"],
      excerpt: "Команда исследователей оказывается на другом конце галактики и должна найти путь домой сквозь неизведанные миры...",
      status: "Завершён"
    },
    {
      id: 3,
      title: "Академия теней",
      author: "ТёмныйСказитель",
      authorAvatar: "ТС",
      rating: 4.7,
      reads: "9.8K",
      chapters: 8,
      genre: "Мистика",
      tags: ["Тайна", "Магия", "Интрига"],
      excerpt: "Престижная академия магии скрывает тёмные секреты, и новый ученик намерен раскрыть их все...",
      status: "В процессе"
    },
    {
      id: 4,
      title: "Последний хранитель",
      author: "ЛегендаПера",
      authorAvatar: "ЛП",
      rating: 4.6,
      reads: "7.3K",
      chapters: 12,
      genre: "Фэнтези",
      tags: ["Эпик", "Драма", "Героика"],
      excerpt: "Когда все хранители древних знаний погибли, последний из них должен передать наследие достойному преемнику...",
      status: "В процессе"
    }
  ];

  const addComment = (storyId: number) => {
    if (!newComment.trim()) return;
    
    setComments(prev => ({
      ...prev,
      [storyId]: [
        { author: "Вы", text: newComment, time: "Только что" },
        ...(prev[storyId] || [])
      ]
    }));
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E1E2E] to-[#2A1A3E]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#B5CF4] to-[#A78BFA] bg-clip-text text-transparent mb-2">
                Fanfiction Hub
              </h1>
              <p className="text-muted-foreground">Твоя вселенная историй</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Icon name="User" size={18} />
              Профиль
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="Поиск фанфиков..." 
                className="pl-10 bg-card border-border"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Icon name="Plus" size={18} />
              Написать фанфик
            </Button>
          </div>
        </header>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-card border-border mb-6">
            <TabsTrigger value="all" className="gap-2">
              <Icon name="BookOpen" size={16} />
              Все
            </TabsTrigger>
            <TabsTrigger value="popular" className="gap-2">
              <Icon name="TrendingUp" size={16} />
              Популярные
            </TabsTrigger>
            <TabsTrigger value="new" className="gap-2">
              <Icon name="Sparkles" size={16} />
              Новые
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Icon name="Star" size={16} />
              Избранное
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6">
              {fanfics.map((fanfic, index) => (
                <Card 
                  key={fanfic.id} 
                  className="bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer animate-fade-in overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedStory(selectedStory === fanfic.id ? null : fanfic.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/20 text-primary">{fanfic.authorAvatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{fanfic.author}</p>
                            <p className="text-xs text-muted-foreground">{fanfic.chapters} глав • {fanfic.reads} прочтений</p>
                          </div>
                        </div>
                        <CardTitle className="text-2xl mb-2 hover:text-primary transition-colors">
                          {fanfic.title}
                        </CardTitle>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {fanfic.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                            {fanfic.genre}
                          </Badge>
                          {fanfic.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Icon name="Star" size={18} fill="currentColor" />
                          <span className="font-semibold">{fanfic.rating}</span>
                        </div>
                        <Badge variant="outline" className={fanfic.status === "Завершён" ? "border-green-500/50 text-green-400" : "border-blue-500/50 text-blue-400"}>
                          {fanfic.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-primary hover:bg-primary/90 gap-2">
                        <Icon name="BookOpen" size={18} />
                        Читать
                      </Button>
                      <Button variant="outline" size="icon" className="hover:bg-primary/10">
                        <Icon name="Heart" size={18} />
                      </Button>
                      <Button variant="outline" size="icon" className="hover:bg-primary/10">
                        <Icon name="Bookmark" size={18} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="hover:bg-primary/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStory(selectedStory === fanfic.id ? null : fanfic.id);
                        }}
                      >
                        <Icon name="MessageCircle" size={18} />
                      </Button>
                    </div>

                    {selectedStory === fanfic.id && (
                      <div className="mt-6 pt-6 border-t border-border animate-fade-in">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <Icon name="MessageCircle" size={20} />
                          Комментарии
                        </h3>
                        
                        <div className="space-y-4 mb-4">
                          {(comments[fanfic.id] || []).map((comment, idx) => (
                            <div key={idx} className="bg-secondary/50 rounded-lg p-4 animate-fade-in">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-primary/20 text-primary text-xs">
                                    {comment.author[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{comment.author}</p>
                                  <p className="text-xs text-muted-foreground">{comment.time}</p>
                                </div>
                              </div>
                              <p className="text-sm text-foreground/90">{comment.text}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Textarea 
                            placeholder="Напишите комментарий..." 
                            className="bg-background border-border resize-none"
                            rows={2}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addComment(fanfic.id);
                            }}
                            className="bg-primary hover:bg-primary/90"
                          >
                            <Icon name="Send" size={18} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular">
            <p className="text-center text-muted-foreground py-8">Здесь будут популярные фанфики</p>
          </TabsContent>

          <TabsContent value="new">
            <p className="text-center text-muted-foreground py-8">Здесь будут новые фанфики</p>
          </TabsContent>

          <TabsContent value="favorites">
            <p className="text-center text-muted-foreground py-8">Здесь будут избранные фанфики</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
