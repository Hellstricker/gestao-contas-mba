﻿using GestaoContas.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestaoContas.Data.Mappings
{
    internal class OrcamentoConfiguration : IEntityTypeConfiguration<Orcamento>
    {
        public void Configure(EntityTypeBuilder<Orcamento> builder)
        {
            builder.ToTable("Orcamentos");
            builder.HasKey(o => o.Id);

            builder.Property(o => o.Limite)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(o => o.CategoriaId)
                .IsRequired(false); 

            builder.Property(o => o.UsuarioId)
                .IsRequired();

            builder.HasOne(o => o.Usuario)
                .WithMany(u => u.Orcamentos)
                .HasForeignKey(o => o.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade); 

            builder.HasOne(o => o.Categoria)
                .WithMany(c => c.Orcamentos)
                .HasForeignKey(o => o.CategoriaId)
                .OnDelete(DeleteBehavior.SetNull); 
        }
    }
}
